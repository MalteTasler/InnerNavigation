CREATE PROCEDURE [dbo].[CreateCategory]
	@Name nvarchar(64),
	@DisplayName nvarchar(MAX),
	@isHTTPS bit,
	@Port nchar(4)

AS
begin
	declare @dbId int
				
	INSERT INTO Category
	(DisplayName, Name, isHTTPS, Port)
	values
	(@DisplayName, @Name, @isHTTPS, @Port)
	set @dbId = SCOPE_IDENTITY()
	SELECT * FROM viCategory WHERE Id = @dbId
	
end