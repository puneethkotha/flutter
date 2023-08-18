import HttpError from '@wasp/core/HttpError.js'

export const getCarousel = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { id } = args;
  const carousel = await context.entities.Carousel.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!carousel) { throw new HttpError(404, "No carousel with id " + id) }

  if (carousel.user.id !== context.user.id) { throw new HttpError(400, "Carousel with id " + id + " does not belong to the authenticated user") }

  return carousel;
}

export const getCarousels = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const carousels = await context.entities.Carousel.findMany({
    where: {
      user: { id: context.user.id }
    }
  });

  return carousels || [];
}
