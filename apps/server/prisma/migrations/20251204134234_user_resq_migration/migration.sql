-- CreateTable
CREATE TABLE "user_questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_questions_pkey" PRIMARY KEY ("id")
);
