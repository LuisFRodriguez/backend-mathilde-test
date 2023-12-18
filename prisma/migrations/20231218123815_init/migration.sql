-- CreateTable
CREATE TABLE "car_list" (
    "id" SERIAL NOT NULL,
    "auto_name" VARCHAR NOT NULL,
    "creation_date" TIMESTAMP,

    CONSTRAINT "car_list_pkey" PRIMARY KEY ("id")
);
