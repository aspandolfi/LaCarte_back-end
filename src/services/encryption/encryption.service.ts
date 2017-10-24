import {compare, genSalt, hash} from 'bcrypt';

export class EncryptionService {
  public genSalt (): Promise<string> {
    return genSalt()
      .then(
        (salt: string) => salt
      );
  }

  public hash (input: string, salt: string): Promise<string> {
    return hash(input, salt);
  }

  public compare (input: string, salt: string): Promise<boolean> {
    return compare(input, salt);
  }
}

export const encryptionService: EncryptionService = new EncryptionService();
