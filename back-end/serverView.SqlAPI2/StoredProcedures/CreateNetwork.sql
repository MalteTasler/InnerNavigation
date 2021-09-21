CREATE PROCEDURE [dbo].[CreateNetwork]
	@Name nvarchar(64),
	@SubnetOff nvarchar(64)

AS
begin
	declare @dbId int
	declare @nId int
	IF @SubnetOff = N'' set @nId = (SELECT Id FROM Network WHERE Name = N'noNetwork')
	ELSE set @nId = (SELECT Id FROM Network WHERE Name = @SubnetOff)
	
	INSERT INTO Network
	(Name, SubnetOff)
	values
	(@Name, @nId)
	set @dbId = SCOPE_IDENTITY()
	SELECT * FROM viNetwork WHERE Id = @dbId
end