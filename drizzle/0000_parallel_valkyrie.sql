CREATE TABLE `localMissions` (
	`missionId` text PRIMARY KEY NOT NULL,
	`missionTitle` text NOT NULL,
	`missionContent` text NOT NULL,
	`missionPriorityId` integer NOT NULL,
	`missionStartTime` text NOT NULL,
	`missionEndTime` text NOT NULL,
	`modifyAt` text NOT NULL,
	`userId` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `localOrders` (
	`id` text PRIMARY KEY NOT NULL,
	`parent` text NOT NULL,
	`num` integer NOT NULL,
	`deleted` integer DEFAULT false,
	`itemType` text DEFAULT 'NOT_DONE',
	`userId` text DEFAULT ''
);
