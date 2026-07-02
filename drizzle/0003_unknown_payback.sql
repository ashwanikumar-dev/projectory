CREATE TYPE "public"."vote_type" AS ENUM('UP', 'DOWN');--> statement-breakpoint
ALTER TABLE "vote" ADD COLUMN "type" "vote_type" NOT NULL;