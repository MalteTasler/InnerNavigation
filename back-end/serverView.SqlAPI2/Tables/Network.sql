CREATE TABLE [dbo].[Network]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,	
	[Name] nvarchar(MAX),
	[SubnetOff] INT FOREIGN KEY REFERENCES Network(Id),
	[CreationTime] datetimeoffset DEFAULT getUTCDate(),
	[DeleteTime] datetimeoffset
)
