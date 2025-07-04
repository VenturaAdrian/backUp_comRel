USE [comrel_master]
GO

/****** Object:  Table [dbo].[comment_master]    Script Date: 11/06/2025 3:43:26 pm ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[comment_master](
	[comment_id] [int] IDENTITY(1,1) NOT NULL,
	[comment] [nvarchar](max) NOT NULL,
	[created_by] [nvarchar](255) NOT NULL,
	[created_at] [datetime] NULL,
	[request_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[comment_master] ADD  DEFAULT (getdate()) FOR [created_at]
GO


