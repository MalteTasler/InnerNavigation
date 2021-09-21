/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Name]
      ,[SubnetOff]
      ,[CreationTime]
  FROM [ServerCheck2].[dbo].[viNetwork]