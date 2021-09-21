CREATE PROCEDURE [dbo].[CreateService]
	@Name nvarchar(64),
	@DisplayName nvarchar(MAX),
	@RunsOn nvarchar(64)

AS
begin
	declare @dbId int
	declare @sId int
	IF @RunsOn = N'' set @sId = (SELECT Id FROM Server WHERE Name=N'24')
	ELSE set @sId = (SELECT Id FROM Server WHERE Name = @RunsOn)
		
	INSERT INTO Service
	(DisplayName, Name, RunsOn)
	values
	(@DisplayName, @Name, @sId)
	set @dbId = SCOPE_IDENTITY()
	SELECT * FROM viService WHERE Id = @dbId
END