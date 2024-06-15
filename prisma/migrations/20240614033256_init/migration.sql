-- CreateTable
CREATE TABLE "Client" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FinancialRecord" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "unitPrice" DECIMAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" DECIMAL NOT NULL,
    "totalPrice" DECIMAL NOT NULL,
    "operationType" TEXT NOT NULL,
    "operationName" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    CONSTRAINT "FinancialRecord_operationId_fkey" FOREIGN KEY ("operationId") REFERENCES "Operation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FinancialRecord_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "totalAmount" DECIMAL NOT NULL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Operation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "type" TEXT NOT NULL
);
