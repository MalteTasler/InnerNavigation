/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Name]
      ,[SubnetOff]
      ,[CreationTime]
      ,[DeleteTime]
  FROM [ServerCheck2].[dbo].[Network]