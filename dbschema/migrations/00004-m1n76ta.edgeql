CREATE MIGRATION m1n76ta3xp72sw7kgndlbigsvfws7utl7qe4voglut5uu6hmnl5jkq
    ONTO m1qmaiydz7jlt2fxwpwgntp7n2ebwxl4gxsdufaqwasjdgbnpf4fla
{
  CREATE TYPE default::Credential {
      CREATE LINK user: default::User;
      CREATE REQUIRED PROPERTY counter: std::int64;
      CREATE REQUIRED PROPERTY createdAt: std::datetime;
      CREATE REQUIRED PROPERTY publicKey: std::bytes;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK credentials: default::Credential;
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.email);
  };
};
