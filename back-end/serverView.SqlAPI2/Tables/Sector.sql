CREATE TABLE [dbo].[Sector]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,
	[Name] varchar(8),
	[Location] INT FOREIGN KEY REFERENCES Location(Id),
	[CreationTime] datetimeoffset DEFAULT getUTCDate(),
	[DeleteTime] datetimeoffset
)
