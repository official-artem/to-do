import bcrypt from 'bcrypt';
export async function hashPass(pass: string) {
  const a = bcrypt.hash(pass, 10, function(err: any, hash: string) {
  
    if (err) {
      throw new Error(err);
    }

    return hash;
  })

  return a;
}

interface ComparePasswordProps {
  pass: string;
  hash: string;
}

export async function comparePassword({ pass, hash }: ComparePasswordProps) {
  try {
    const match = await bcrypt.compare(pass, hash);

    return match;
  } catch (err: any) {
    throw new Error(err);
  }
}