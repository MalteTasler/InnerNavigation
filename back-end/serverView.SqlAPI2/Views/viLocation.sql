CREATE VIEW [dbo].[viLocation]
	AS SELECT Location.Id, 
	Location.Name,
	Address.Number AS LotNumber,
	Address.Street AS Street,
	Address.ZIP AS ZIP,
	Address.City AS City,
	Address.Country AS Country,
	Location.CreationTime
	FROM Location
	INNER JOIN Address on Location.Address = Address.Id
	WHERE Location.DeleteTime IS NULL AND Location.Id != 0