CREATE TABLE [dbo].[Server]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,	
	[Comment] nvarchar(MAX),
	[Name] nvarchar(MAX),
	[MemberOff] INT FOREIGN KEY REFERENCES Network(Id),
	[VirtualHost] INT FOREIGN KEY REFERENCES Server(Id),
	[IPAddress] nvarchar(16),
	[Position] INT FOREIGN KEY REFERENCES Position(Id),
	[CreationTime] datetimeoffset DEFAULT getUTCDate(),
	[DeleteTime] datetimeoffset
)
