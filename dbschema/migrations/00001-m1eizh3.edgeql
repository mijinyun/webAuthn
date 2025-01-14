CREATE MIGRATION m1eizh3htapbk33wtqgohdobtcpekqaad5et5wpxkupj4skkpnsrka
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE TYPE default::user {
      CREATE PROPERTY name: std::str;
  };
};
