CREATE TABLE [dbo].[Category]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,	
	[DisplayName] nvarchar(MAX),
	[Name] nvarchar(MAX),
	[isHTTPS] bit,
	[Port] nchar(4),
	[CreationTime] datetimeoffset DEFAULT getUTCDate(),
	[DeleteTime] datetimeoffset
)