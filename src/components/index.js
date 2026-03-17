
import { Button, ButtonGroup } from './Button';
import { Input, TextArea } from './Input';
import { Modal, Dialog } from './Modal';
import { Select, Option } from './Select';
export { Button, ButtonGroup, Input, TextArea, Modal, Dialog, Select, Option };

function test() {
  const { key1 } = require("./inner");
  console.log(key1);
}

test();
