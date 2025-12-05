FROM timescale/timescaledb-ha:pg16-latest

# Disable telemetry by default; override via build args if needed.
ARG TIMESCALEDB_TELEMETRY=off
ENV TIMESCALEDB_TELEMETRY=${TIMESCALEDB_TELEMETRY}

# Expose PostgreSQL port
EXPOSE 5432
