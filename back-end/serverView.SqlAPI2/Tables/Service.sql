CREATE TABLE [dbo].[Service]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,	
	[DisplayName] nvarchar(MAX),
	[Name] nvarchar(MAX),
	[RunsOn] INT NOT NULL FOREIGN KEY REFERENCES Server(Id),
	[CreationTime] datetimeoffset DEFAULT getUTCDate(),
	[DeleteTime] datetimeoffset
)
