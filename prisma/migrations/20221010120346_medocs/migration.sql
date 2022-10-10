-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tenant" TEXT NOT NULL DEFAULT 'user',
    "cpf" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "documents" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "documentContent" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Documents_Rent" (
    "userId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "Documents_Rent_pkey" PRIMARY KEY ("userId","documentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "Documents_Rent" ADD CONSTRAINT "Documents_Rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents_Rent" ADD CONSTRAINT "Documents_Rent_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
