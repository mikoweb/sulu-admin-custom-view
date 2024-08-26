<?php

namespace App\Core\Application\Converter;

use Symfony\Component\Serializer\SerializerInterface;

readonly class SimpleObjectConverter
{
    public function __construct(
        private SerializerInterface $serializer,
    ) {
    }

    /**
     * @param array<string> $groups
     */
    public function convert(
        object $source,
        string $targetClass,
        ?array $groups = null,
    ): object {
        return $this->serializer->deserialize(
            $this->serializer->serialize($source, 'json', context: is_null($groups) ? [] : ['groups' => $groups]),
            $targetClass,
            'json'
        );
    }

    /**
     * @param array<object> $source
     * @param array<string> $groups
     *
     * @return array<object>
     */
    public function convertAny(
        array $source,
        string $targetClass,
        ?array $groups = null,
    ): array {
        return array_map(
            fn (object $object) => $this->convert($object, $targetClass, $groups),
            $source
        );
    }
}
