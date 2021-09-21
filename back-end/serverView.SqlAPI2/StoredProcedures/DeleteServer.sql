CREATE PROCEDURE [dbo].[DeleteServer]
	@name nvarchar(128)

AS
begin
	
	declare @Id int
	set @Id = (SELECT Id FROM Server WHERE Name = @name)
	UPDATE Server 
	SET [DeleteTime] = getdate()
	WHERE 
	Id = @Id
				
end