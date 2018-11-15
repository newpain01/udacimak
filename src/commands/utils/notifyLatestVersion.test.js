import nock from 'nock';
import getPkgInfo from './getPkgInfo';
import notifyLatestVersion from './notifyLatestVersion';
import { API_ENDPOINTS_NPMS_PACKAGE } from '../../config';


describe('Notify Latest Version', () => {
  test('should not throw error on 500 response', async () => {
    const appName = getPkgInfo().name;
    const url = `${API_ENDPOINTS_NPMS_PACKAGE}/${appName}`;
    
    nock(url)
      .get()
      .reply(500, 'internal server error');

    try {
      await notifyLatestVersion();
    } catch (e) {
      expect(e).toBeFalsy();
    }
  });
});