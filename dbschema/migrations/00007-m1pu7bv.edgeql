CREATE MIGRATION m1pu7bva2fwu7briknst2chmtxzyyzqx25jsh7il5wsphxsoj4ag5a
    ONTO m1rkr57xgev3cqfh2wey26q4rpdyob7iv7xq6fyyzfbiwyap23wkfq
{
  ALTER TYPE default::User {
      CREATE PROPERTY challenge: std::str;
  };
};
