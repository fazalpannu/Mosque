"""create mosque table

Revision ID: 0001_create_mosque_table
Revises: 
Create Date: 2026-05-19 00:00:00.000000
"""

from alembic import op
import sqlalchemy as sa

revision = '0001_create_mosque_table'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'mosques',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('city', sa.String(), nullable=False),
        sa.Column('address', sa.String(), nullable=False),
        sa.Column('imam_name', sa.String(), nullable=False),
        sa.Column('prayer_time', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
    )


def downgrade():
    op.drop_table('mosques')
