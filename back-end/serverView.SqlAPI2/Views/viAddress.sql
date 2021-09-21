CREATE VIEW [dbo].[viAddress]
	AS SELECT Address.Id, 
	Address.Number,
	Address.Street,
	Address.ZIP,
	Address.City,
	Address.Country,
	Address.CreationTime
	FROM Address
	WHERE Address.DeleteTime IS NULL AND Address.Id != 0