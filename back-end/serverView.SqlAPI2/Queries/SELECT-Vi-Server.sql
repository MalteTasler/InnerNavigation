/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [Id]
      ,[Name]
      ,[Comment]
      ,[MemberOff]
      ,[VirtualHost]
      ,[CreationTime]
      ,[IPAddress]
  FROM [ServerCheck2].[dbo].[viServer]