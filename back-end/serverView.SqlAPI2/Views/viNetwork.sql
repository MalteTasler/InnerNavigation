CREATE VIEW [dbo].[viNetwork]
	AS SELECT Network.Id, 
	Network.Name,
	second.Name AS SubnetOff,
	Network.CreationTime
	FROM Network
	INNER JOIN Network second on Network.SubnetOff = second.Id
	WHERE Network.DeleteTime IS NULL AND Network.Id != (SELECT Id FROM Network WHERE Name = N'noNetwork')
