import HttpError from '@wasp/core/HttpError.js'

export const createCarousel = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Carousel.create({
    data: {
      imgPath: args.imgPath,
      caption: args.caption,
      user: {
        connect: { id: context.user.id }
      }
    }
  });
}

export const updateCarousel = async ({ id, imgPath, caption }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const carousel = await context.entities.Carousel.findFirst({
    where: { id, userId: context.user.id }
  });

  if (!carousel) { throw new HttpError(404) };

  return context.entities.Carousel.update({
    where: { id },
    data: { imgPath, caption }
  });
}
