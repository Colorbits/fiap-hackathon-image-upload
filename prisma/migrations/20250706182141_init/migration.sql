-- CreateTable
CREATE TABLE "VideoZip" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "videoUuid" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "path" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoZip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "videoZipUuid" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoZip_uuid_key" ON "VideoZip"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Image_uuid_key" ON "Image"("uuid");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_videoZipUuid_fkey" FOREIGN KEY ("videoZipUuid") REFERENCES "VideoZip"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
