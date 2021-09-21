CREATE VIEW [dbo].[viCategory]
	AS SELECT Category.Id, 
	Category.Name,
	Category.DisplayName,
	Category.isHTTPS,
	Category.Port,
	Category.CreationTime
	FROM Category
	
	WHERE Category.DeleteTime IS NULL
