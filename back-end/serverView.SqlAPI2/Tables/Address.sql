CREATE TABLE [dbo].[Address]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,
	[Number] varchar(16),
	[Street] nvarchar(32),
	[ZIP] char(5),
	[City] nvarchar(16),
	[Country] nvarchar(16),
	[CreationTime] datetimeoffset DEFAULT getUTCDate(),
	[DeleteTime] datetimeoffset
)
