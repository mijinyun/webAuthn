CREATE MIGRATION m1cvkel23suitos7lpny7d3wbpmvrabhufmosz2o22mgc3ftr4vikq
    ONTO m1eizh3htapbk33wtqgohdobtcpekqaad5et5wpxkupj4skkpnsrka
{
  ALTER TYPE default::user RENAME TO default::User;
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY email: std::str {
          SET REQUIRED USING (<std::str>{});
          CREATE CONSTRAINT std::regexp(r'^[^@]+@[^@]+\.[^@]+$');
      };
  };
};
