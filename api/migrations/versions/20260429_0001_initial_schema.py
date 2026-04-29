"""initial sqlalchemy schema

Revision ID: 20260429_0001
Revises:
Create Date: 2026-04-29 14:05:00
"""

from alembic import op
import sqlalchemy as sa


revision = "20260429_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "channels",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index("ix_channels_id", "channels", ["id"], unique=False)
    op.create_index("ix_channels_name", "channels", ["name"], unique=True)

    op.create_table(
        "leads",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("company", sa.String(length=255), nullable=True),
        sa.Column("contact", sa.String(length=255), nullable=False),
        sa.Column("message", sa.String(length=2000), nullable=False),
        sa.Column("consent", sa.Boolean(), nullable=False),
        sa.Column("source_page", sa.String(length=100), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
    )
    op.create_index("ix_leads_id", "leads", ["id"], unique=False)
    op.create_index("ix_leads_contact", "leads", ["contact"], unique=False)
    op.create_index("ix_leads_source_page", "leads", ["source_page"], unique=False)

    op.create_table(
        "messages",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("channel_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
        sa.ForeignKeyConstraint(["channel_id"], ["channels.id"], ondelete="CASCADE"),
    )
    op.create_index("ix_messages_id", "messages", ["id"], unique=False)
    op.create_index("ix_messages_channel_id", "messages", ["channel_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_messages_channel_id", table_name="messages")
    op.drop_index("ix_messages_id", table_name="messages")
    op.drop_table("messages")

    op.drop_index("ix_leads_source_page", table_name="leads")
    op.drop_index("ix_leads_contact", table_name="leads")
    op.drop_index("ix_leads_id", table_name="leads")
    op.drop_table("leads")

    op.drop_index("ix_channels_name", table_name="channels")
    op.drop_index("ix_channels_id", table_name="channels")
    op.drop_table("channels")