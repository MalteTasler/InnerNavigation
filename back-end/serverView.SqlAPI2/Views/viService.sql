CREATE VIEW [dbo].[viService]
	AS SELECT Service.Id, 
	Service.Name,
	Service.DisplayName,
	Server.Name AS RunsOn,
	Service.CreationTime
	FROM Service
	INNER JOIN Server on Service.RunsOn = Server.Id
	WHERE Service.DeleteTime IS NULL
