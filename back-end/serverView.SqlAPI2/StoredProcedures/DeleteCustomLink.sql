CREATE PROCEDURE [dbo].[DeleteCustomLink]
	@name nvarchar(128)

AS
begin
	
	declare @Id int
	set @Id = (SELECT Id FROM CustomLink WHERE Name = @name)
	UPDATE CustomLink 
	SET [DeleteTime] = getdate()
	WHERE 
	Id = @Id
				
end