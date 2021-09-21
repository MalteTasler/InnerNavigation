CREATE TABLE [dbo].[Position]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,
	[x] INT,
	[y] INT,
	[Room] INT FOREIGN KEY REFERENCES Room(Id),
	[CreationTime] datetimeoffset DEFAULT getUTCDate(),
	[DeleteTime] datetimeoffset
)
