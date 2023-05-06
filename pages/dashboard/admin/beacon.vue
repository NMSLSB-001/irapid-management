<template>
  <a-row gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" :type="flex">
    <a-col flex="1">
      <a-card title="Default size card" style="width: 300px">
        <a slot="extra" href="#">more</a>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col flex="1">
      <a-card title="Default size card" style="width: 300px">
        <a slot="extra" href="#">more</a>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </a-col>
    <a-col flex="1">
      <a-card title="Default size card" style="width: 300px">
        <a slot="extra" href="#">more</a>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </a-col>
  </a-row>
</template>
