CREATE PROCEDURE [dbo].[CreateCustomLink]
	@Name nvarchar(64),
	@Ref nvarchar(256)

AS
begin
	declare @dbId int
				
	INSERT INTO CustomLink
	(Ref, Name)
	values
	(@Ref, @Name)
	set @dbId = SCOPE_IDENTITY()
	SELECT * FROM viCustomLink WHERE Id = @dbId
	
end