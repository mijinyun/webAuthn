CREATE MIGRATION m1qmaiydz7jlt2fxwpwgntp7n2ebwxl4gxsdufaqwasjdgbnpf4fla
    ONTO m1cvkel23suitos7lpny7d3wbpmvrabhufmosz2o22mgc3ftr4vikq
{
  ALTER TYPE default::User {
      CREATE REQUIRED LINK identity: ext::auth::Identity {
          SET REQUIRED USING (<ext::auth::Identity>{});
      };
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
