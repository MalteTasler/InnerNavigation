CREATE PROCEDURE [dbo].[DeleteService]
	@name nvarchar(128)

AS
begin
	
	declare @Id int
	set @Id = (SELECT Id FROM Service WHERE Name=@name)
	UPDATE Service 
	SET [DeleteTime] = getdate()
	WHERE 
	Id = @Id
end