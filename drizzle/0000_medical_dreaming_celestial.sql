CREATE TABLE "history" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "history_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"Datetime" varchar(255) NOT NULL,
	"Correctness" varchar(255) NOT NULL,
	"TimeTaken" varchar(255) NOT NULL,
	"Notes" varchar(255) NOT NULL,
	"Source" varchar(255) NOT NULL
);
