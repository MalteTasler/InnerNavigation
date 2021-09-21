CREATE PROCEDURE [dbo].[DeleteCategory]
	@name nvarchar(128)

AS
begin
	
	declare @Id int
	set @Id = (SELECT Id FROM Category WHERE Name = @name)
	UPDATE Category 
	SET [DeleteTime] = getdate()
	WHERE 
	Id = @Id
				
end