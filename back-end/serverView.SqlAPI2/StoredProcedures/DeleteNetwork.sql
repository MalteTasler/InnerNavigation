CREATE PROCEDURE [dbo].[DeleteNetwork]
	@name nvarchar(128)

AS
begin

	declare @Id int
	set @Id = (SELECT Id FROM Network WHERE Name = @name)
	UPDATE Network 
	SET [DeleteTime] = getdate()
	WHERE 
	Id = @Id
end