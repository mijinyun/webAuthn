CREATE MIGRATION m1rkr57xgev3cqfh2wey26q4rpdyob7iv7xq6fyyzfbiwyap23wkfq
    ONTO m1vlhiu6k4ujdd3vohlpnuq4vlsegsqh7ukabgy26pq6z2fevf2qrq
{
  ALTER TYPE default::User {
      DROP LINK identity;
  };
};
