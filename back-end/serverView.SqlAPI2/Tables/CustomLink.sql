CREATE TABLE [dbo].[CustomLink]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,	
	[Name] nvarchar(128),
	[Ref] nvarchar(MAX),
	[CreationTime] datetimeoffset DEFAULT getUTCDate(),
	[DeleteTime] datetimeoffset
)
