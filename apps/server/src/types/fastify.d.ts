import "fastify";

export type AppFile = {
  fieldname: string;
  filename: string;
  mimetype: string;
  buffer: Buffer | null;
  size: number;
  path?: string;
};

declare module "fastify" {
  interface FastifyInstance {
    env: {
      PORT: number;
      HOST: string;
      NODE_ENV: "development" | "production";
      FRONT_URL: string;
      FRONT_URL_DEV: string;
      COOKIE_SECRET: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    };
  }
  interface FastifyRequest {
    myFormData?: {
      fields: Record<string, any>;
      files: AppFile[];
    };
  }

  interface FastifyReply {
    res200<T>(data: T): FastifyReply;
    res201<T>(data: T): FastifyReply;
    res204(): void;

    res400<T>(data?: T): FastifyReply;
    res401<T>(data?: T): FastifyReply;
    res403<T>(data?: T): FastifyReply;
    res409<T>(data?: T): FastifyReply;
    res419<T>(data?: T): FastifyReply;
    res422<T>(data?: T): FastifyReply;
    res429<T>(data?: T): FastifyReply;
    res500<T>(data?: T): FastifyReply;
  }
}
