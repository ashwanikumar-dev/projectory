CREATE TABLE "vote" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"product_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "vote_user_product_unique" UNIQUE("user_id","product_id")
);
--> statement-breakpoint
ALTER TABLE "vote" ADD CONSTRAINT "vote_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "vote_product_idx" ON "vote" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "vote_user_idx" ON "vote" USING btree ("user_id");