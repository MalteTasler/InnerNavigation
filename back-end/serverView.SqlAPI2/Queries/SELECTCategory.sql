/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[DisplayName]
      ,[Name]
      ,[isHTTPS]
      ,[Port]
      ,[CreationTime]
      ,[DeleteTime]
  FROM [ServerCheck2].[dbo].[Category]